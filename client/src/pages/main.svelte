<script>
    import Product from "../components/item.svelte";
    import {createEventDispatcher} from "svelte";

    const pageDispatch = createEventDispatcher();

    function changePageToViewier(e) {
        pageDispatch('changePage', {
            index: e.detail.index,
            item: e.detail.item
        });
    }

    export let products;
    $: items = products;

    let isCollapsed = false;

    function filterMenuSwitch() {
        isCollapsed = !isCollapsed;
    }
</script>

<div class="main">
    <div class="filters" class:collapsed={isCollapsed}>
        <button on:click={filterMenuSwitch}>
            <div class="burger"></div>
        </button>
        <div class="filter__content">
            some filters go here
        </div>
    </div>
    {#if !items}
        <div class="loading">
            Loading
        </div>
    {:else }
        <div class="searchRes">
            {#each items as item}
                <Item on:changePage={changePageToViewier} item={item}></Item>
            {/each}
        </div>
    {/if}

</div>

<style>
    .loading{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
    }
    .main {
        display: flex;
        width: 100%;
        height: 100%;
    }

    .filters {
        transition: width 320ms ease-in-out;
        position: relative;
        width: 20%;
        background: #141416;
        height: 100%;
        color: #fff;
        font-family: "Comfortaa", sans-serif;
    }

    .burger {
        position: relative;
        transform: translateY(2px);
    }

    .collapsed .burger {
        transform: translateY(0);
    }

    .burger::after, .burger, .burger::before {
        content: '';
        width: 24px;
        border-radius: 4px;
        transition: transform .6s ease-in-out, margin .6s ease-in-out;
    }

    .burger::after, .burger::before {
        display: block !important;
        height: 4px;
        background: #fff;

    }

    .burger::after {
        transform: rotate(45deg) translateY(-3px) translateX(-3px);
        margin-top: 0;
    }

    .burger::before {
        transform: rotate(-45deg);
    }

    .collapsed .burger::after {
        margin-top: 4px;
        transform: none;
    }

    .collapsed .burger::before {
        transform: none;
    }

    .filters button {
        background: #262626;
        padding: 1rem;
        outline: none;
        border: none;
        border-radius: 9px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 0;
        width: 48px;
        height: 48px;
    }

    .collapsed button {

    }

    .collapsed {

        width: 3%;
    }

    .collapsed .filter__content {
        display: none;
    }

    .filters::after {
        content: "";
        display: block;
        position: absolute;
        width: 4px;
        height: 100vh;
        right: 0;
        top: 0;
        box-shadow: 4px 0px 5px rgba(34, 34, 34, 0.45);
        border-right: 1px solid #414141;
    }

    .searchRes {
        gap: 10px;
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        background: #141416;
        overflow-y: auto;
    }


</style>