<script>
    import {onMount} from "svelte";

    export let item;
    import Zoomable from "svelte-layer-zoomable";

    export let user;
    let inBasket = false
    onMount(() => {
        if (user.basket.includes(item.code)) {
            inBasket = true;
        }
    })
    let imageLink = item.imageIds[0];
    let moveResize;
    let transitionDuration = 0.2;
    let minScale = 0.1;
    let maxScale = 20;
    async function addBasket(){
        const res = await fetch(`http://localhost:3001/api/user/basket/${item.code}`, {credentials: "include"});
        if(res.ok){
            const data = await res.json();
            console.log(data);
            if(data.success){
                user.basket.push(item.code);
                inBasket=true;
            }else{
                alert(data.error);
            }
        }


    }
    async function removeBasket(){
        const res = await fetch(`http://localhost:3001/api/user/removebasket/${item.code}`, {credentials: "include"});
        if(res.ok){
            const data = await res.json();
            console.log(data);
            if(data.success){
                user.basket.push(item.code);
                inBasket=false;
            }else{
                alert(data.error);
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

                            <img src="http://localhost:3001/api/item/image/{link}"
                                 alt="Some error with loading occured"/>

                        </div>
                    {/each}
                </div>
            </div>
            <div class="mainImage">
                <Zoomable
                        bind:moveResize
                        initialScale={0.3}
                        initialX={0.4}
                        initialY={0.4}
                        {transitionDuration}
                        {minScale}
                        {maxScale}
                >
                    <img src="http://localhost:3001/api/item/image/{imageLink}"
                         alt="Some error with loading occured"/>
                </Zoomable>
            </div>
        </div>
        <div class="info">
            <!--{JSON.stringify(item)}-->
            <h1>{item.name}</h1>
            <span class="platforms">
                {#each item.platforms as platform}
                    <img class="platformimg"
                         src="http://localhost:3001/api/images/{platform}.png"
                         alt={platform}/>
                {/each}
            </span>
            {#if !inBasket}
                <a on:click={addBasket}>Add to basket</a>
            {:else}
                <a on:click={removeBasket}>Remove from basket</a>
            {/if}
        </div>
    </div>
    <div class="desc-comments">
        {item.desc}
    </div>
</div>


<style>
    .barWrapper {
        padding: 10px;
        width: 300px;
    }

    .platforms > img {
        width: 70px;
        height: 70px;
    }

    .viewier {
        overflow-y: scroll;
    }

    .desc-comments {
        height: 800px;
    }

    .info > a {
        border: solid 2px white;
        display: flex;
        align-items: center;
        font-family: Comfortaa;
        text-decoration: none;
        border-radius: 8px;
        min-height: 44px;
        padding: 0 2rem;
        background: #5dc47c;
        color: white;
        font-size: 20px;
        transition: all 320ms;
        width: 250px;
        margin: auto;
    }

    .mainViewierContent {
        display: flex;
        height: 100vh;
    }

    .images {
        width: 80%;
        background: #141416;
        display: grid;
        grid-template-columns: 250px 1fr;
        position: relative;

    }

    .images::after {
        content: "";
        display: block;
        position: absolute;
        width: 4px;
        height: 100%;
        right: 0;
        top: 0;
        box-shadow: 0px 4px 5px rgba(34, 34, 34, 0.45);
        border-right: 1px solid #414141;
    }

    .info > h1 {
        font-family: ubuntu-name;
        color: #d7d7d7;
        font-size: 40px;
    }

    .info {
        width: 35%;
        background: #141416;
        display: flex;
        flex-direction: column;
        padding: 20px;
        justify-content: center;
    }

    .info > a:hover {
        transform: scale(1.2);
        background: #19a640;
        cursor: pointer;
    }

    .imageBar {
        overflow-y: auto;
        width: 250px;
        height: 95vh;
        display: flex;
        flex-direction: column;
        gap: 15px;
        align-items: center;
        justify-content: center;
        z-index: 1;

    }

    .imageInBar {
        width: 200px;
        height: 200px;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        outline: 0px solid transparent;
        transition: outline-color 100ms, outline-width 100ms;
    }

    .imageInBar > img {
        object-fit: cover;
        width: 200px;
        height: 200px;
        border-radius: 20px;
    }

    .imageSelected {
        outline: 5px solid white;
        z-index: 3;
    }

    .mainImage {
        display: flex;
        align-items: center;
        justify-content: center;
        max-height: 80vh;
    }

    .mainImage > img {
        width: 100%;
        max-width: 80%;
        max-height: 80vh;
        object-fit: contain;
    }
</style>