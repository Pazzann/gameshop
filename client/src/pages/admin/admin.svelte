<script>
    import styles from "./admin.css";
    import AdminItem from "../../components/adminitem/adminItem.svelte";
    import Cookies from "universal-cookie";
    import {Link} from "svelte-routing";

    export let user;
    export let items;
    const cookies = new Cookies();

    async function removeItem(e) {
        const res = await fetch(`http://localhost:3001/api/products/${e.detail.code}`, {
            headers: {
                authorization: `Bearer ${cookies.get("token")}`
            },
            method: "DELETE"
        });
        if (res.ok) {
            const data = await res.json();
            if (data) {
                let item;
                let index = -1;
                items.map((a, i) => {
                    if (a.code === e.detail.code) {
                        item = a;
                        index = i;
                    }
                })
                user.basket.splice(user.basket.indexOf(e.detail.code), 1);
                user = user;
                items.splice(index, 1);
                items = items;
            } else {
                alert("Login please!");
            }
        }
    }
    async function onRemove(){
        const res = await fetch(`http://localhost:3001/api/products`);
        if (res.ok) {
            const data = await res.json();
            items = data;
        }
    }
</script>
<div class="basket">
    {#if user}
        {#if user.access == 1}
            {#if items}
            <div class="basketpage">
                <div class="basketInfo">
                    <Link class="newButton" to="/admin/edit/new">Add new</Link>
                </div>
                {#if items}
                    {#each items as item}
                        <AdminItem on:adminremove={onRemove} adminItem={item} on:adminremove={removeItem}></AdminItem>
                    {/each}
                {/if}
            </div>
            {:else}
                <div class="basketpage">
                    Loading...
                </div>
            {/if}
        {:else}
            <div class="basketpage">
                You do not have access!
            </div>
        {/if}
    {:else}
        <div class="basketpage">
            You are not logged in!
        </div>
    {/if}
</div>



