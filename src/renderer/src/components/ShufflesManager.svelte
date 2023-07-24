<script>
  import { Accordion, AccordionItem } from '@skeletonlabs/skeleton'
</script>

<div class="w-[500px]">
  <h3 class="h3 m-3">Custom shuffles</h3>
  <Accordion>
    <AccordionItem open>
      <svelte:fragment slot="lead">(icon)</svelte:fragment>
      <svelte:fragment slot="summary">(summary)</svelte:fragment>
      <svelte:fragment slot="content">(content)</svelte:fragment>
    </AccordionItem>
    <AccordionItem>
      <svelte:fragment slot="lead">(icon)</svelte:fragment>
      <svelte:fragment slot="summary">(summary)</svelte:fragment>
      <svelte:fragment slot="content">(content)</svelte:fragment>
    </AccordionItem>
  </Accordion>
</div>
