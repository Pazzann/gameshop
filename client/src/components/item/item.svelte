<script>
    import {Link} from "svelte-routing";
    import styles from "./item.css";
    export let item;
    let on = false;
</script>
<Link to="/products/{item.code}">
    <div class="item" class:itemhover={on} on:mouseenter={()=>on=true} on:mouseleave={()=>on=false}>
        <div class="content">
            <img src={item.imageIds[0].includes("http") ? item.imageIds[0] : `http://localhost:3001/api/images/assets/${item.imageIds[0]}`} alt="don't appear that image is loaded"/>
            <div class="textInItem">
                <span class="itemText"><span class="argument">Name: </span>{item.title}</span>
                <span class="itemText"><span class="argument">Desc: </span>{item.description.split('').slice(0, 25).join('')}
                    ...</span>
                <span class="itemText"><span class="argument">Platforms: </span>
                    {#each item.platforms as platform} <img class="platformimg"
                                                            src="/images/{platform}.png"
                                                            alt={platform}/>{/each}</span>
                <span class="itemText"><span class="argument">Rating: </span>{item.reviews.length > 0 ? Math.round(item.reviews.reduce((sum, a)=>{return sum + +a.rating}, 0) / item.reviews.length) : "No reviews"} / 5</span>
                <span class="itemText"><span class="argument">Reviews: </span>{item.reviews.length}</span>
                <span class="itemText price"><span class="argument priceText">Price: </span><span
                        class="priceValue">{item.price}</span></span>
            </div>
        </div>
    </div>
</Link>


