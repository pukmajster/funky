<script lang="ts">
  import { libraryActiveSubCategories } from '../../../stores/library'
</script>

{#if $libraryActiveSubCategories.length == 1}
  <slot />
{/if}
