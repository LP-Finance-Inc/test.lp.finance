import { PublicKey } from "@solana/web3.js";
import {
  parseMappingData,
  parsePriceData,
  parseProductData,
} from "@pythnetwork/client";

const ORACLE_PUBLIC_KEY = "BmA9Z6FjioHJPpjT39QazZyhDRUdZy2ezwx4GiDdE2u2";

const chunks = (array, size) => {
  return Array.apply(0, new Array(Math.ceil(array.length / size))).map(
    (_, index) => array.slice(index * size, (index + 1) * size)
  );
};

const getMultipleAccountsCore = async (connection, keys, commitment) => {
  const args = connection._buildArgs([keys], commitment, "base64");

  const unsafeRes = await connection._rpcRequest("getMultipleAccounts", args);
  if (unsafeRes.error) {
    throw new Error(
      "failed to get info about account " + unsafeRes.error.message
    );
  }

  if (unsafeRes.result.value) {
    const array = unsafeRes.result.value;
    return { keys, array };
  }

  throw new Error();
};

export const getMultipleAccounts = async (connection, keys, commitment) => {
  const result = await Promise.all(
    chunks(keys, 99).map((chunk) =>
      getMultipleAccountsCore(connection, chunk, commitment)
    )
  );

  const array = result
    .map((a) =>
      a.array
        .map((acc) => {
          if (!acc) return undefined;

          const { data, ...rest } = acc;
          const obj = {
            ...rest,
            data: Buffer.from(data[0], "base64"),
          };
          return obj;
        })
        .filter((_) => _)
    )
    .flat();
  return { keys, array };
};

export const getTokensPriceList = async (connection) => {
  let priceList = [];

  const publicKey = new PublicKey(ORACLE_PUBLIC_KEY);

  try {
    const accountInfo = await connection.getAccountInfo(publicKey);

    const { productAccountKeys, nextMappingAccount } = parseMappingData(
      accountInfo.data
    );
    let allProductAccountKeys = [...productAccountKeys];
    let anotherMappingAccount = nextMappingAccount;

    while (anotherMappingAccount) {
      const accountInfo = await connection.getAccountInfo(
        anotherMappingAccount
      );
      if (!accountInfo || !accountInfo.data) {
        anotherMappingAccount = null;
      } else {
        const { productAccountKeys, nextMappingAccount } = parseMappingData(
          accountInfo.data
        );

        allProductAccountKeys = [
          ...allProductAccountKeys,
          ...productAccountKeys,
        ];
        anotherMappingAccount = nextMappingAccount;
      }
    }

    const productsInfos = await getMultipleAccounts(
      connection,
      productAccountKeys.map((p) => p.toBase58()),
      "confirmed"
    );
    const productsData = productsInfos.array.map((p) =>
      parseProductData(p.data)
    );

    const priceInfos = await getMultipleAccounts(
      connection,
      productsData.map((p) => p.priceAccountKey.toBase58()),
      "confirmed"
    );

    let SolPrice = 0;

    for (let i = 0; i < productsInfos.keys.length; i++) {
      const key = productsInfos.keys[i];

      const productData = productsData[i];
      const product = productData.product;
      const symbol = product["symbol"];
      const priceAccountKey = productData.priceAccountKey;
      const priceInfo = priceInfos.array[i];

      if (!accountInfo || !accountInfo.data) return;

      const price = parsePriceData(priceInfo.data);

      if (symbol === "Crypto.SOL/USD") {
        SolPrice = price.price;
      }

      if (
        symbol === "Crypto.BTC/USD" ||
        symbol === "Crypto.SOL/USD" ||
        symbol === "Crypto.USDC/USD" ||
        symbol === "Crypto.MSOL/USD"
      ) {
        if (price.price === undefined) {
          if (symbol === "Crypto.USDC/USD") {
            priceList.push({ Symbol: symbol, Price: 1 });
          } else if (symbol === "Crypto.MSOL/USD") {
            priceList.push({ Symbol: symbol, Price: SolPrice * 1.04 });
          }
        } else {
          priceList.push({ Symbol: symbol, Price: price.price });
        }
      }
    }

    return priceList;
  } catch (e) {
    console.warn(e);
  }
};
