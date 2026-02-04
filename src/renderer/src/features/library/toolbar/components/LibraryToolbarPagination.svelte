<script lang="ts">
  import { ArrowLeft, ArrowRight } from 'lucide-svelte'
  import {
    libraryActiveSubCategories,
    libraryPage,
    libraryPageCount
  } from '../../../../stores/library'
  import { clamp } from '../../../../utils'

  // Limit the active subcategories to 1
  $: {
    $libraryActiveSubCategories.length > 1 &&
      ($libraryActiveSubCategories = [$libraryActiveSubCategories.at(-1)])
  }

  function prevPage() {
    if ($libraryPage > 1) {
      $libraryPage--
    }
  }

  function nextPage() {
    if ($libraryPage < $libraryPageCount) {
      $libraryPage++
    }
  }

  $: {
    $libraryPage = clamp($libraryPage, 1, $libraryPageCount)
    document.querySelector('#page')?.scrollTo({ top: 0, behavior: 'smooth' })
  }
</script>

<div class="flex items-center bg-surface-800 h-full rounded-full">
  <div class="flex flex-col min-w-[80px] pl-4 gap-[2px]">
    <p class="text-[9px] uppercase leading-none">Page</p>
    <span class="text-base leading-none">{$libraryPage} / {$libraryPageCount}</span>
  </div>

  <button on:click={prevPage} class="btn-icon !rounded-r-none -btn-icon-sm variant-filled-surface">
    <ArrowLeft class="w-6" />
  </button>

  <div class="h-full w-[1px] bg-surface-900" />

  <button on:click={nextPage} class="btn-icon !rounded-l-none -btn-icon-sm variant-filled-surface">
    <ArrowRight class="w-6" />
  </button>
</div>
