import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type ParamsTypes = {
  [key: string]: string[];
};

type ItemsTypes = {
  id: number;
  title: string;
  check: boolean;
};

const useQueryParams = (
  setSearchData?: Dispatch<SetStateAction<ItemsTypes[]>>,
  setOtherFilterData?: Dispatch<SetStateAction<ItemsTypes[]>>,
  setBrandFilterData?: Dispatch<SetStateAction<ItemsTypes[]>>
) => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);

  const updateUrlParams = (params: ParamsTypes) => {
    if (!params || typeof params !== "object") return;

    const searchParams = Object.entries(params)
      .map(([key, val]) =>
        Array.isArray(val) && val.length
          ? `${key}=${encodeURIComponent(val.join(","))}`
          : ""
      )
      .filter(Boolean)
      .join("&");

    navigate({ search: searchParams });
  };

  const [queryParams, setQueryParams] = useState<ParamsTypes | null>(null);

  const updateQuery = (
    action: string,
    key?: string,
    value?: string,
    UrlParamsInitialState?: ParamsTypes
  ) => {
    let newQuery = { ...queryParams };

    // @ Get previous stored params
    const previousParams = localStorage.getItem("queryParams")
      ? JSON.parse(localStorage.getItem("queryParams")!)
      : null;

    switch (action) {
      case "initial":
        Object.entries(UrlParamsInitialState ?? {}).forEach(([k, v]) => {
          v.forEach((val) => {
            toggleSelection(k, val);
            newQuery[k] = [...(newQuery[k] ?? []), val];
          });
        });
        break;

      case "toggle":
        newQuery = { ...previousParams };
        if (key && value) {
          newQuery[key] =
            key === "price"
              ? value.split(",")
              : key === "sort"
              ? [value]
              : newQuery[key]?.includes(value)
              ? newQuery[key].filter((val) => val !== value)
              : [...(newQuery[key] ?? []), value];
        }

        break;
    }

    // @ Store current params values
    localStorage.setItem("queryParams", JSON.stringify(newQuery));
    setQueryParams(newQuery);
    updateUrlParams(newQuery);
  };

  const toggleSelection = (key: string, value: string) => {
    updateQuery("toggle", key, value, undefined);

    const toggleCheck = (items: ItemsTypes[]) =>
      items.map((item) =>
        item.title.toLowerCase().replaceAll(" ", "") ===
        value.toLowerCase().replaceAll(" ", "")
          ? { ...item, check: !item.check }
          : item
      );

    if (key === "brand") {
      setBrandFilterData && setBrandFilterData((prev) => toggleCheck(prev));
    } else {
      setOtherFilterData && setOtherFilterData(toggleCheck);
    }
    setSearchData && setSearchData(toggleCheck)!;
  };

  useEffect(() => {
    const urlParams: ParamsTypes = {};
    // @reset previous stored params
    localStorage.removeItem("queryParams");

    searchParams.forEach((val, key) => {
      const values = val.split(",").map((v) => decodeURIComponent(v));
      urlParams[key] = [...(urlParams[key] ?? []), ...values];
    });

    updateQuery("initial", undefined, undefined, urlParams);
  }, []);

  return {
    toggleSelection,
    updateQuery,
  };
};

export default useQueryParams;
