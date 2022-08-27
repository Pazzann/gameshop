<script>
    import Header from './components/header/header.svelte'
    import Main from './pages/main/main.svelte';
    import Basket from './pages/basket/basket.svelte';
    import Admin from './pages/admin/admin.svelte';
    import Viewier from './pages/viewier/viewier.svelte';
    import {onMount} from "svelte";
    import {Router, Link, Route} from "svelte-routing";

    export let url = "";
    // let item;
    // let page = "main";
    // let pages = ["main", "admin", "viewier", "basket"];
    // function pageSwitchEvent(e) {
    //     page = pages[e.detail.index];
    //     item = e.detail.item;
    // }

    let products;
    onMount(async () => {
        const res = await fetch(`http://localhost:3001/api/products`);
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
    <Router url="{url}">
    <Header on:login={setUser}/>

    <div class="page">

            <Route path = "/">
                <Main products={products}></Main>
            </Route>
            <Route path = "/admin">
                <Admin></Admin>
            </Route>
            <Route path = "/products/:id" let:params>
                <Viewier item={products.filter((a)=> a.code==params.id)[0]} user={user}></Viewier>
            </Route>
            <Route path = "/basket">
                <Basket></Basket>
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