<script lang="ts">
  import { CheckSquare, ChevronDown, ChevronUp, Square } from 'lucide-svelte'
  import type { PathTreeEntry } from '../utils/vpk-browser'
  import classNames from 'classnames'

  export let treePath: PathTreeEntry
  export let selectedFromParent = false

  let selected = false
  let expanded = false

  function handleClick() {
    if (treePath.children) {
      expanded = !expanded
      return
    }
  }

  function handleSelect(e) {
    e.stopPropagation()

    if (selectedFromParent) {
      return
    }

    selected = !selected
  }

  $: isSelected = selectedFromParent || selected
  $: isDirectory = treePath.children && treePath.children.length > 0
</script>

{#if treePath}
  <div class={classNames('  border-l border-surface-500/80', {})}>
    <button
      class={classNames(' group flex items-center gap-2 p-2 hover:bg-surface-600 w-full', {
        'bg-surface-500/20': !isDirectory
      })}
      on:click={handleClick}
    >
      <span class="w-4 h-4 hidden">
        <button on:click={handleSelect}>
          <span class="">
            {#if isSelected}
              <CheckSquare class="w-full h-full  text-primary-500" />
            {:else}
              <Square class="w-full h-full" />
            {/if}
          </span>
        </button>
      </span>

      <span> {treePath.name}</span>

      {#if isDirectory}
        {#if expanded}
          <ChevronUp class="w-4" />
        {:else}
          <ChevronDown class="w-4" />
        {/if}
      {/if}

      <!-- {#if !isDirectory}
        <span class="invisible group-hover:visible ml-auto btn btn-sm variant-surface-filled"
          >quick export</span
        >
      {/if} -->
    </button>

    {#if isDirectory && expanded}
      <div class="pl-4">
        {#each treePath.children as child}
          <svelte:self treePath={child} selectedFromParent={isSelected} />
        {/each}
      </div>
    {/if}
  </div>
{/if}
