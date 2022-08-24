<script>
    import Header from './components/header.svelte'
    import Main from './pages/main.svelte';
    import Basket from './pages/basket.svelte';
    import Admin from './pages/admin.svelte';
    import Viewier from './pages/viewier.svelte';
    import {onMount} from "svelte";

    let item;
    let page = "main";
    let pages = ["main", "admin", "viewier", "basket"];

    function pageSwitchEvent(e) {
        page = pages[e.detail.index];
        item = e.detail.item;
    }

    let products;
    onMount(async () => {
        const res = await fetch(`http://localhost:3001/api/items`, {credentials: "include"});
        if (res.ok) {
            const data = await res.json();
            products = data;
            console.log(products);
        }
    });
    let user = null;
    function setUser(e) {
        if (e.detail.loggedIn) {
            user = e.detail.user;
            console.log(e.detail.user);
        }
    }


</script>

<main>
    <Header on:changePage={pageSwitchEvent} on:login={setUser}/>

    <div class="page">

        {#if page === "main"}
            <Main on:changePage={pageSwitchEvent} products={products}></Main>
        {:else if page === "admin"}
            <Admin></Admin>
        {:else if page === "viewier" }
            <Viewier item={item} user={user}></Viewier>
        {:else }
            <Basket></Basket>
        {/if}

    </div>

</main>


<style>
    .page {
        display: flex;
        flex-direction: column;
        width: 100vw;
        height: 100vh;
        overflow-y: auto;
    }

</style>