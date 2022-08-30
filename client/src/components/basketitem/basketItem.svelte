<script>
    import styles from "./basketItem.css";
    import {createEventDispatcher} from "svelte";
    import {Link} from "svelte-routing";
    export let basketItem;

    const removeDispatcher = createEventDispatcher();
    function remove(){
        removeDispatcher('basketremove', {
            code: basketItem.code,
        })
    }

</script>

<div class="basketItem">
    <img src={basketItem.imageIds[0].includes("http") ? basketItem.imageIds[0] : `http://localhost:3001/api/images/assets/${basketItem.imageIds[0]}`} />
    <Link to={`/products/${basketItem.code}`}>{basketItem.title}</Link>
    <div>
        <span>{basketItem.price}</span>
        <button on:click={remove}>Remove</button>
    </div>

</div>