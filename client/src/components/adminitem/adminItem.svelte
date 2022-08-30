<script>
    import styles from "./adminItem.css";
    import {createEventDispatcher} from "svelte";
    import {Link} from "svelte-routing";
    import Cookies from "universal-cookie";
    export let adminItem;
    const cookies = new Cookies();
    const removeDispatcher = createEventDispatcher();
    async function deleteItem(){
        console.log(adminItem.code);
        const res = await fetch(`http://localhost:3001/api/products/${adminItem.code}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${cookies.get("token")}`,
                'Content-Type': 'application/json'
            },
        });
        if(res.ok){
            removeDispatcher('adminremove', {
                code: adminItem.code,
            })
        }
    }
</script>

<div class="basketItem">
    <img src={adminItem.imageIds[0].includes("http") ? adminItem.imageIds[0] : `http://localhost:3001/api/images/assets/${adminItem.imageIds[0]}`} />
    <Link to={`/products/${adminItem.code}`}>{adminItem.title}</Link>
    <div>
        <span>{adminItem.price}</span>
        <Link to={`/admin/edit/${adminItem.code}`}>Edit</Link>
        <button on:click={deleteItem}>Delete</button>
    </div>

</div>