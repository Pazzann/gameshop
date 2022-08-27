<script>
    import Zoomable from "svelte-layer-zoomable";
    let moveResize;
    let transitionDuration = 0.2;
    let minScale = 0.6;
    let maxScale = 20;
    export let imageLink;
</script>



<div class="mainImage">
    <Zoomable
            bind:moveResize
            initialScale={0.6}
            initialX={0.5}
            initialY={0.5}
            {transitionDuration}
            {minScale}
            {maxScale}
    >
        <img class="imgzoom" src={imageLink.includes("http") ? imageLink : `http://localhost:3001/api/images/assets/${imageLink}`}
             alt="Some error with loading occured"/>
    </Zoomable>
</div>



<style>
    .mainImage {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        max-height: 100vh;
        padding: 30px;
    }
    .imgzoom{
        transform: scale(0.5);
    }

</style>