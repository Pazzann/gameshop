<script>
    export let item;
    import Zoomable from "svelte-layer-zoomable";

    let imageLink = item.imageIds[0];
    let moveResize;
    let transitionDuration = 0.2;
    let minScale = 0.1;
    let maxScale = 20;
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
                        initialScale={1}
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
            {JSON.stringify(item)}
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

    .viewier {
        overflow-y: scroll;
    }

    .desc-comments {
        height: 800px;
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

    .info {
        width: 35%;
        background: #141416;
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
        transition: outline-color 200ms, outline-width 640ms;
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