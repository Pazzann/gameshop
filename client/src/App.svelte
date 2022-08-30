<script>
    import Header from './components/header/header.svelte'
    import Main from './pages/main/main.svelte';
    import Basket from './pages/basket/basket.svelte';
    import Admin from './pages/admin/admin.svelte';
    import Edit from './pages/admin/editor/editor.svelte';
    import Viewier from './pages/viewier/viewier.svelte';
    import {onMount} from "svelte";
    import {Router, Link, Route} from "svelte-routing";

    export let url = "";

    let products;

    onMount(async () => {
        const res = await fetch(`http://localhost:3001/api/products`);
        if (res.ok) {
            const data = await res.json();
            products = data;
        }
    });
    let user = null;

    function setUser(e) {
        if (e.detail.loggedIn) {
            user = e.detail.user;
        }
    }


    async function getItem(id) {
        const res = await fetch(`http://localhost:3001/api/products/${id}`);
        if (res.ok) {
            return await res.json();
        }
    }

    function editItemSearch(id){
        switch (id){
            case "new": {
                return {
                    code: -1,
                    title: "Default",
                    description: "Description goes here",
                    imageIds: [],
                    price: "0$",
                    tags: [],
                    type: "Digital",
                    platforms: [],
                }
            }

            default: {
                return products.filter((a)=> a.code==id)[0];
            }
        }

    }
</script>

<main>
    <Router url="{url}">
        <Header on:login={setUser} products={products}/>
        <div class="page">
            <Route path="/">
                <Main products={products}></Main>
            </Route>
            <Route path="/admin">
                <Admin user={user} bind:items={products}></Admin>
            </Route>
            <Route path="/products/:id" let:params>
                <Viewier item={products.filter((a)=> a.code==params.id)[0]} bind:user={user}></Viewier>
            </Route>
            <Route path="/admin/edit/:id" let:params>
                <Edit item={editItemSearch(params.id)} bind:user={user}></Edit>
            </Route>
            <Route path="/basket">
                {#if user}
                    <Basket bind:user={user} items={products}></Basket>
                {:else}
                    <div>Log in please</div>
                {/if}
            </Route>
        </div>
    </Router>
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