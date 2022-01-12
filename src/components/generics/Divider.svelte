<script lang="ts">
    export let height: number = 1
</script>

<div class="divider" style="height: {height}px;"></div>

<style>
    .divider {
        width: 100%;
        background: linear-gradient(90deg, rgba(116, 148, 221, 0.1) 48.96%, rgba(116, 148, 221, 0) 100%);
    }
</style>