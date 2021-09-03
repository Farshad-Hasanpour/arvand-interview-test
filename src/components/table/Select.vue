<template>
	<label class="checkbox-option">
		<input
				:ref="`checkbox-${item.id}`"
				v-model="selected"
				type="checkbox"
				:value="item.id"
				class="checkbox-input"
		>
		<span class="checkbox"></span>
	</label>
</template>

<script>
	export default {
		name: "Select"
	}
</script>

<style scoped>

</style>