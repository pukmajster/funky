<script lang="ts">
  import { CheckSquare, ChevronDown, ChevronUp, Square } from 'lucide-svelte'
  import classNames from 'classnames'
  import type { PathTreeEntry } from '../../utils/vpk-browser'

  export let treePath: PathTreeEntry
  export let selectedFromParent = false
  export let level = 0

  // Array of very soft rainbow colors friendly to dark mode
  const colors = [
    '#ff0000',
    '#ff8000',
    '#ffff00',
    '#80ff00',
    '#00ff00',
    '#00ff80',
    '#00ffff',
    '#0080ff',
    '#0000ff',
    '#8000ff',
    '#ff00ff',
    '#ff0080'
  ].reverse()

  $: color = colors[level % colors.length]

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
  <div class={classNames(` border-l  ]`, {})} style={` border-color: ${color}C0`}>
    <button
      class={classNames(' group flex items-center gap-2 px-2 py-1  hover:bg-surface-600 w-full', {
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

      <span>{isDirectory ? '/' : ''}{treePath.name}</span>

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
          <svelte:self treePath={child} selectedFromParent={isSelected} level={level + 1} />
        {/each}
      </div>
    {/if}
  </div>
{/if}
