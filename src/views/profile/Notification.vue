.<template>
  <div class="container mx-auto">
    <Breadcrumbs parentTitle="通知" />

    <div class="grid grid-cols-12 gap-5">
      <div v-for="(obj, index) in 4" :key="index" class="
          col-span-12
          xl:col-span-12
          lg:col-span-12
          md:col-span-12
          sm:col-span-12
        ">
        <BaseCard>
        </BaseCard>

      </div>

    </div>
  </div>
</template>

<script setup>

</script>

<style></style>