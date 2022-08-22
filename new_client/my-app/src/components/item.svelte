<script>
    import {createEventDispatcher} from "svelte";
    //
    // export let siteUser;
    export let item;
    let on = false;
    const pageDispatch = createEventDispatcher();

    function changePageToViewier() {
        pageDispatch('changePage', {
            index: 2,
            item: item
        });
    }
</script>

<div class="item" class:itemhover={on} on:mouseenter={()=>on=true} on:mouseleave={()=>on=false}
     on:click={changePageToViewier}>
    <div class="content">
        <img src="http://localhost:3001/api/item/image/{item.imageId[0]}" alt="don't appear that image is loaded"/>
        <div class="textInItem">
            <span class="itemText"><span class="argument">Name: </span>{item.title}</span>
            <span class="itemText"><span class="argument">Desc: </span>{item.desc.split('').slice(0, 54).join('')}
                ...</span>
            <span class="itemText"><span class="argument">Platforms: </span>
                {#each item.platforms as platform} <img class="platformimg"
                                                        src="http://localhost:3001/api/images/{platform}.png"
                                                        alt={platform}/>{/each}</span>
            <span class="itemText"><span class="argument">Rating: </span>{item.rating}</span>
            <span class="itemText"><span class="argument">Reviews: </span>{item.reviews}</span>
            <span class="itemText price"><span class="argument priceText">Price: </span><span
                    class="priceValue">{item.price}</span></span>
        </div>

    </div>
</div>


<style>
    .price {
        position: relative;
        font-size: 40px;
    }

    .argument {
        color: gray;
    }

    .priceValue {
        font-family: Impact;
        position: absolute;
        right: 3px;
        bottom: 5px;
        font-weight: bold
    }

    .priceText {
        font-size: 30px;

        margin-right: 100px;
    }

    .itemText {
        display: flex;
        gap: 10px;
        color: white;
    }

    .textInItem {
        display: flex;
        flex-direction: column;
        gap: 1px;
        font-size: 20px;
    }

    .item {
        position: relative;
        width: 300px;
        height: 500px;
        color: #fff;
        max-height: 500px;
        flex: 0 0 300px;
        margin-top: 15px;
        margin-left: 15px;
        z-index: 5;
        border-radius: 20px;
        transition: box-shadow 640ms ease-in, transform 300ms;
        box-shadow: 0 0 0 100vmax rgba(0, 0, 0, 0);
    }

    .item:hover {
        transform: translateY(-5px);
    }

    .content > img {
        width: 270px;
        height: 270px;
        object-fit: cover;
        border-radius: 20px;
    }

    .content {
        font-family: ubuntu-name;
        background: #262626;
        position: absolute;
        width: 300px;
        height: 500px;
        z-index: 999;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: center;
        padding: 15px;
    }

    .platformimg {
        width: 20px;
        height: 20px;
    }

    .item::before,
    .item::after {
        border-radius: 54px;
        content: '';
        position: absolute;
        width: 300px;
        height: 500px;
        background: linear-gradient(45deg,
        #ffff00, #00ff00, #0099ff, #001aff, #a200ff, #ff0055, #ff0000,
        #ff0055, #ff0000, #ffff00, #00ff00, #0099ff, #001aff, #a200ff
        );
        transition: all 640ms;
    }

    .item:hover::after, .item:hover::before {
        background: linear-gradient(45deg,
        #ffff00, #00ff00, #0099ff, #001aff, #a200ff, #ff0055, #ff0000,
        #ff0055, #ff0000, #ffff00, #00ff00, #0099ff, #001aff, #a200ff
        );
        background-size: 300%;
        animation: border 12s linear infinite;
    }

    .item:hover::after {
        filter: blur(100px);
    }


    .item:hover {
        z-index: 10;
        cursor: pointer;
    }

    @keyframes border {
        0%, 100% {
            background-position: 0 0;
        }
        50% {
            background-position: 250%;
        }
    }

</style>