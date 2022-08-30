<script>
    import {onMount} from "svelte";
    import Zoom from "../../components/zoom/zoom.svelte"
    import Comment from "../../components/comment/comment.svelte";
    import styles from "./viewier.css";
    import Cookies from "universal-cookie";

    export let item;
    export let user;
    let text = "Entertext...";
    let itemrating = 0;

    const cookies = new Cookies();
    let imageLink = item.imageIds[0];
    let inBasket = false;
    let basketInVisibility = true;
    let rating;
    let attachments = [];


    function removeComment(e){
        const commentId = e.detail.id;
        let indexOfComment = -1;
        item.reviews.map((review, index)=>{
            if(review.id == commentId)
                indexOfComment = index;
        });
        if(indexOfComment !== -1){
            item.reviews.splice(indexOfComment, 1);
            item = item;
        }
    }


    function removeFile(link) {
        if (attachments.includes(link)){
           attachments.splice(attachments.indexOf(link), 1);
           attachments = attachments;
        }
    }

    async function newFile(e) {
        let formData = new FormData();
        formData.append("file", e.target.files[0]);
        const res = await fetch(`http://localhost:3001/api/images/products`, {
            mode: "cors",
            method: "POST",
            body: formData
        });
        if (res.ok) {
            const fileName = await res.text();
            attachments.push(fileName);
            attachments = attachments;
        }
    }

    async function newComment(e) {
        e.preventDefault();

        let preventNullComment = 0;
        if (!(text === "Entertext..." || text === ""))
            preventNullComment++;
        if (itemrating !== 0)
            preventNullComment++;
        if (attachments.length !== 0)
            preventNullComment++;
        if (preventNullComment === 0) {
            alert("Cannot send empty comment");
            return;
        }
        if (text === "Entertext...")
            text = "";

        const res = await fetch(`http://localhost:3001/api/reviews/${item.code}`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${cookies.get("token")}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: text,
                rating: String(itemrating),
                attachments: attachments
            })
        });
        attachments = [];
        text = "Entertext...";
        itemrating = 0;
        starArr = [];
        if (!res.ok)
            alert("Login please!")
        else {
            const res2 = await fetch(`http://localhost:3001/api/products/${item.code}`);
            if (res2.ok) {
                const curItem = await res2.json();
                item = curItem;
            }
        }
    }

    onMount(async () => {
        const res = await fetch(`http://localhost:3001/api/products/${item.code}`);
        if (res.ok) {
            const curItem = await res.json();
            item = curItem;
        }
        if (!user?.basket) {
            basketInVisibility = true;
        } else {
            basketInVisibility = false;
            if (user.basket.includes(String(item.code)))
                inBasket = true;
        }
        if (item.reviews.length !== 0) {
            let sum = 0;
            for (let i = 0; i < item.reviews.length; i++) {
                sum += item.reviews[i].rating == "Not Specified" ? 0
                    :
                    +item.reviews[i].rating;
            }
            rating = Math.round(sum / item.reviews.length);
        } else {
            rating = "No reviews";
        }
    })
    let starArr = [];

    function changedRating() {
        starArr = [];
        for (let i = 0; i < itemrating; i++) {
            starArr.push(1);
        }
        starArr = starArr;
    }


    async function addBasket() {
        const res = await fetch(`http://localhost:3001/api/users/basket/${item.code}`, {
            headers: {
                authorization: `Bearer ${cookies.get("token")}`
            },
            method: "PUT"
        });
        if (res.ok) {
            const data = await res.json();
            if (data) {
                user.basket.push(String(item.code));
                inBasket = true;
                user = user;
            } else {
                alert("Login please!");
            }
        }

    }

    async function removeBasket() {
        const res = await fetch(`http://localhost:3001/api/users/basket/${item.code}`, {
            headers: {
                authorization: `Bearer ${cookies.get("token")}`
            },
            method: "DELETE"
        });
        if (res.ok) {
            const data = await res.json();
            if (data) {
                user.basket.splice(user.basket.indexOf(item.code), 1);
                inBasket = false;
                user = user;
            } else {
                alert("Login please!");
            }
        }
    }
</script>


<div class="viewier">
    <div class="mainViewierContent">
        <div class="images">
            <div class="barWrapper">
                <div class="imageBar">
                    {#each item.imageIds as link}
                        <div class="imageInBar" on:click={()=>{imageLink=link}} class:imageSelected={imageLink===link}>
                            <img
                                    src={link.includes("http") ? link : `http://localhost:3001/api/images/assets/${link}`}
                                    alt="Some error with loading occured"
                            />
                        </div>
                    {/each}
                </div>
            </div>
            <Zoom imageLink={imageLink}></Zoom>
        </div>
        <div class="info">
            <h1>{item.title}</h1>
            <span class="platforms">
                <span>Platforms:</span>
                {#each item.platforms as platform}
                    <img class="platformimg"
                         src="/images/{platform}.png"
                         alt={platform}/>
                {/each}
            </span>
            <span><span>Type:</span>{"   " + item.type.toLowerCase()}</span>
            <span><span>Rating:</span>{"   " + rating}</span>
            <span><span>Price:</span>{"   " + item.price}</span>
            {#if !inBasket}
                <a class:invisible={basketInVisibility} on:click={addBasket}>Add to basket</a>
            {:else}
                <a class:invisible={basketInVisibility} on:click={removeBasket}>Remove from basket</a>
            {/if}
        </div>
    </div>
    <div class="desc-comments">


        <div class="description">
            <h1>{item.title}</h1>

            {#each item.description.split(".").splice(0, item.description.split(".").length - 1) as line}
                <span>{line}.</span>
            {/each}
        </div>
        <div class="comments">
            <form class="sendform" on:submit={newComment}>
                <div class="topCommentStat">
                    <input id="rangeinput" type="range" bind:value={itemrating} on:change={changedRating} min="0"
                           max="5"/>
                    <label class="submitbutton" for="imageButton">
                        Add Image
                    </label>
                    <input style="display: none" id="imageButton" type="file" on:change={newFile}>
                    <input class="submitbutton" type="submit" value="Submit"/>
                    {#if starArr}
                        <div class="rating">
                            {#each starArr as img}
                                <img src="/images/star.png" alt="star"/>
                            {/each}
                        </div>
                    {/if}
                </div>
                <textarea bind:value={text}/>
                {#if attachments.length !== 0}
                    <div class="newattachments">
                        {#each attachments as link}
                            <div class="imageinInput" on:click={()=>removeFile(link)}>
                                <img src={`http://localhost:3001/api/images/assets/${link}`} alt="No comments"/>
                            </div>
                        {/each}
                    </div>
                {/if}
            </form>
            {#if item.reviews && user}
                {#each item.reviews as review}
                    <Comment on:remove={removeComment}  review={review} user={user} itemcode={item.code}></Comment>
                {/each}
            {/if}
        </div>
    </div>
</div>


