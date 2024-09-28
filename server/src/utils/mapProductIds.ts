export async function mapProductIds(
  productIds: { _id: string }[]
): Promise<string[]> {
  const mappedIds: string[] = [];

  return new Promise((resolve) => {
    let index = 0;

    function processChunk() {
      const CHUNK_SIZE = 100;
      for (
        let i = 0;
        i < CHUNK_SIZE && index < productIds.length;
        i++, index++
      ) {
        mappedIds.push(productIds[index]._id);
      }

      if (index < productIds.length) {
        setImmediate(processChunk);
      } else {
        resolve(mappedIds);
      }
    }

    processChunk();
  });
}
