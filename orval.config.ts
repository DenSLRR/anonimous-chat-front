export default {
  main: {
    input: "./src/shared/api/schema.yaml",
    output: {
      target: "./src/shared/api/generated.ts",
      prettier: true,
      client: "vue-query",
      override: {
        mutator: {
          path: "./src/shared/api/api-instance.ts",
          name: "createInstance",
        },
        query: {
          useQuery: true,
          useInfinite: false,
          options: {
            staleTime: 0,
          },
        },
      },
    },
  },
};
