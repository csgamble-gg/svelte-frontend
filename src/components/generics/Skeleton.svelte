<script lang='ts'>
	export let loading: boolean = false;
	export let circle: boolean = false;
</script>

<div class='skeleton' style:border-radius="{circle ? "100%" : "0"}">
	<slot />
</div>

<style>
    @keyframes wave {
        0% {
            transform: translateX(-100%);
        }
        60% {
            transform: translateX(100%);
        }
        100% {
            transform: translateX(100%);
        }
    }

    .skeleton {
        display: block;
        background-color: #141826;
        overflow: hidden;
        position: relative;
    }

    .skeleton::after {
        animation-name: wave;
        animation-duration: 1s;
        animation-timing-function: linear;
        animation-delay: 0.5s;
        animation-iteration-count: infinite;
        content: '';
        position: absolute;
        transform: translateX(-100%);
        inset: 0;
        background-size: 50px 200px;
        background: #141826 linear-gradient(
                to right,
                rgba(255, 255, 255, 0),
                rgba(255, 255, 255, 0.5) 50%,
                rgba(255, 255, 255, 0) 80%
        ) repeat-y 0 0;
    }

</style>
