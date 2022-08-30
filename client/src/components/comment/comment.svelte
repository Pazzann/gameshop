<script>
    import Author from "./author/author.svelte";
    import styles from "./comment.css";
    import {createEventDispatcher} from "svelte";
    import Cookies from "universal-cookie";


    const commentDispatcher = createEventDispatcher();
    const cookies = new Cookies();

    export let review;
    export let user;
    export let itemcode;

    let newText = review.text;
    let itemRating = review.rating;

    let isChange = false;
    let viewable = [];
    review.attachments.map((a, i) => {
        viewable[i] = false;
    })
    let starArr = []
    for (let i = 0; i < review.rating; i++) {
        starArr.push(1);
    }

    async function remove() {
        const res = await fetch(`http://localhost:3001/api/reviews/${itemcode}/${review.id}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${cookies.get("token")}`,
            },
        })
        if (res.ok)
            commentDispatcher("remove", {
                id: review.id
            })
    }

    async function update(){
        isChange=false;
        const res = await fetch(`http://localhost:3001/api/reviews/${itemcode}/${review.id}`, {
            method: "PUT",
            headers: {
                authorization: `Bearer ${cookies.get("token")}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: newText,
                rating: String(itemRating),
                attachments: review.attachments
            })
        });
        review.text = newText;
        review.rating = itemRating;
        changeRating();
    }

    function cancel() {
        newText = review.text;
        itemRating = review.rating;
        changeRating();
        isChange = !isChange;
    }

    function changeRating() {
        starArr = []
        for (let i = 0; i < itemRating; i++) {
            starArr.push(1);
        }
    }
</script>


<div class="comment">
    <div class="author+rating">
        <Author user={review.user}/>
        <div class="rating">
            {#if starArr}
                {#each starArr as img}
                    <img src="/images/star.png" alt="star"/>
                {/each}
            {/if}
        </div>
        {#if user}
            {#if user.userid == review.user.userid}
                {#if !isChange}
                    <button class="commentbutton" on:click={() => {isChange =! isChange}}>Change</button>
                {:else}
                    <button class="commentbutton" on:click={cancel}>Cancel</button>
                    <button class="commentbutton" on:click={update}>Ok</button>
                {/if}
            {/if}
            {#if user.userid == review.user.userid || user.access === 1}
                <button class="commentbutton" on:click={remove}>Delete</button>
            {/if}
        {/if}
    </div>
    {#if !isChange}
        {#each review.text.split(".").splice(0, review.text.split(".").length) as line}
            <span>{line}</span>
        {/each}
    {:else}
        <textarea class="textInComment" bind:value={newText}/>
        <input id="rangeinput" type="range" bind:value={itemRating} on:change={changeRating} min="0"
               max="5"/>
    {/if}
    {#if review.attachments.length !== 0}
        <div class="attachments">
            {#each review.attachments as attachment, i}
                <div class:viewable={viewable[i]} on:click={()=>{viewable[i] = !viewable[i]}}>
                    <img src={`http://localhost:3001/api/images/assets/${attachment}`} alt="No comments">
                </div>
            {/each}
        </div>
    {/if}
</div>