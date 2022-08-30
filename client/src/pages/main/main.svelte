<script>
    import Item from "../../components/item/item.svelte";
    import styles from "./main.css";

    export let products;
    $: items = products;
    let visibleItems = [];

    const platforms = ["SWITCH", "PS4", "XBOX", "PC"];
    let choosedPlatforms = [];

    let isCollapsed = false;

    function filterMenuSwitch() {
        isCollapsed = !isCollapsed;
    }

    function filterApply() {
        visibleItems = items.filter((a) => {
            let has = false;
            choosedPlatforms.map(b => {
                if (a.platforms.includes(b)) {
                    has = true;
                }
            });
            return has;
        })
        console.log(visibleItems);
        visibleItems = visibleItems;
    }
</script>

<div class="main">
    <div class="filters" class:collapsed={isCollapsed}>
        <button on:click={filterMenuSwitch}>
            <div class="burger"></div>
        </button>
        <div class="filter__content">
            <span>Platforms:</span>
            {#each platforms as platform}
                <label>
                    <input type=checkbox bind:group={choosedPlatforms} value={platform}>
                    {platform}
                </label>

            {/each}
            <button on:click={filterApply}>Confirm</button>
        </div>
    </div>
    {#if !items}
        <div class="loading">
            Loading
        </div>
    {:else }
        <div class="searchRes">
            {#if visibleItems.length !==0}
                {#each visibleItems as item}
                    <Item item={item}></Item>
                {/each}
            {:else}
                {#each items as item}
                    <Item item={item}></Item>
                {/each}
            {/if}
        </div>
    {/if}

</div>

