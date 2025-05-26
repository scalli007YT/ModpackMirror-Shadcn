import { CurseForgeClient, CurseForgeSortOrder } from 'curseforge-api';
import { H3Event } from 'h3';
// https://minimusubi.github.io/curseforge-api
export default defineEventHandler(async (event: H3Event) => {
  const { CurseforgeAPIKey } = useRuntimeConfig();
  const client = new CurseForgeClient(CurseforgeAPIKey);

  // Get 'search' query param from URL
  const query = getQuery(event);
  const searchTerm = typeof query.search === 'string' ? query.search : '';

  try {
    const mods = await client.searchMods(432, {
      classId: 4471, 
      searchFilter: searchTerm,  // use dynamic search term here
      sortField: 2,
      pageSize: 10,
      sortOrder: CurseForgeSortOrder.Descending
    });

    return { success: true, data: mods.data };
  } catch (error: any) {
    return {
      success: false,
      message: 'Failed to fetch modpacks',
      error: error?.message || String(error),
      stack: error?.stack || undefined,
      code: error?.code || undefined
    };
  }
});
