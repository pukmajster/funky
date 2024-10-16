<script lang="ts">
  export let activeTab: string
  export let value: string
  export let label: string

  function onClick() {
    activeTab = value
  }

  $: isActive = value == activeTab
</script>

<button
  data-active={isActive}
  class=" transition-all data-[active=true]:indent-1 text-sm hover:variant-soft-primary data-[active=true]:variant-filled-primary data-[active=true]:hover:variant-filled-primary text-left px-5 py-3"
  on:click={onClick}
>
  {label}
</button>
