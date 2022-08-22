<script>
    import Header from './components/header.svelte'
    import Main from './pages/main.svelte';
    import Basket from './pages/basket.svelte';
    import Admin from './pages/+admin.svelte';
    import Viewier from './pages/viewier.svelte';


    let page = "main";
    let pages = ["main", "admin", "viewier", "basket"];
    function pageSwitchEvent(e){
        page = pages[e.detail.index];
    }
</script>

<main>
    <Header on:changePage={pageSwitchEvent}/>

    <div class="page">

        {#if page === "main"}
            <Main on:changePage={pageSwitchEvent}></Main>
        {:else if page === "admin"}
            <Admin></Admin>
        {:else if page === "viewier" }
            <Viewier></Viewier>
        {:else }
            <Basket></Basket>
        {/if}

    </div>

</main>


<style>
    .page{
        display: flex;
        flex-direction: column;
        width: 100vw;
        height: 100vh;

    }

</style>