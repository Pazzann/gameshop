<script>
    import {onMount} from "svelte";
    import Zoom from "../../components/zoom/zoom.svelte"
    import styles from "./viewier.css";
    import Cookies from "universal-cookie";

    export let item;
    export let user;

    const cookies = new Cookies();
    let imageLink = item.imageIds[0];
    let inBasket = false;
    let basketInVisibility = true;

    onMount(() => {
        if (!user?.basket) {
            basketInVisibility = true;
            return
        }

        basketInVisibility = false;
        if (user.basket.includes(String(item.code)))
            inBasket = true;
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
    let rating;

    async function addBasket() {
        const res = await fetch(`http://localhost:3001/api/users/basket/${item.code}`, {
            headers: {
                authorization: `Bearer ${cookies.get("token")}`
            },
            method: "PUT"
        });
        if (res.ok) {
            const data = await res.json();
            console.log(data);
            if (data) {
                user.basket.push(item.code);
                inBasket = true;
            } else {
                alert("Some Error Occured");
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
            console.log(data);
            if (data) {
                user.basket.push(item.code);
                inBasket = false;
            } else {
                alert("Some Error Occured");
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

                            <img src={link.includes("http") ? link : `http://localhost:3001/api/images/assets/${link}`}
                                 alt="Some error with loading occured"/>

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
    </div>
</div>


