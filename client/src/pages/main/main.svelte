<script>
    import Item from "../../components/item/item.svelte";
    import styles from "./main.css";

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
                <Item item={item}></Item>
            {/each}
        </div>
    {/if}

</div>

