<script>
    import styles from "./searchItem.css"
    import {Link} from "svelte-routing";
    export let item;


</script>


<Link to={`/products/${item.code}`} class="searchItem">
    {item.title}
</Link>