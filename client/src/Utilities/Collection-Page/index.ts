import { useState, useEffect, Dispatch, SetStateAction, useRef } from "react";
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
  currentFilterData?: ItemsTypes[],
  searchData?: ItemsTypes[],
  initialFilterData?: ItemsTypes[],
  setSearchData?: Dispatch<SetStateAction<ItemsTypes[]>>,
  setOtherFilterData?: Dispatch<SetStateAction<ItemsTypes[]>>,
  setBrandFilterData?: Dispatch<SetStateAction<ItemsTypes[]>>
) => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);

  const updateUrlParams = (params: ParamsTypes) => {
    if (!params || typeof params !== "object") return;

    //check if they're search for specific product name
    const isSearchQuery = params["q"] ? true : false;

    //remove search key if they're not searching
    // !isSearchQuery && delete params["q"];

    const searchParams = Object.entries(params)
      .map(([key, val]) =>
        Array.isArray(val) && val.length
          ? `${key}=${encodeURIComponent(val.join(","))}`
          : ""
      )
      .filter(Boolean)
      .join("&");

    navigate(
      isSearchQuery
        ? `/shop/collection/search?${searchParams && searchParams}`
        : { search: searchParams }
    );
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
              : key === "q"
              ? [value]
              : newQuery[key]?.includes(value)
              ? newQuery[key].filter((val) => val !== value)
              : [...(newQuery[key] ?? []), value];
        }

        break;
    }
    // console.log("toggle", newQuery);
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
      setBrandFilterData && setBrandFilterData(toggleCheck);
    } else {
      setOtherFilterData && setOtherFilterData(toggleCheck);
    }
    setSearchData && setSearchData(toggleCheck)!;
  };

  useEffect(() => {
    const urlParams: ParamsTypes = {};
    // @remove previous stored params
    localStorage.removeItem("queryParams");

    searchParams.forEach((val, key) => {
      const values = val.split(",").map((v) => decodeURIComponent(v));
      urlParams[key] = [...(urlParams[key] ?? []), ...values];
    });

    updateQuery("initial", undefined, undefined, urlParams);
  }, []);

  // Set filters back to default when searching for an item
  const pathname = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  const searchQuery = searchParams.get("q");
  useEffect(() => {
    const defaultItems = (items: ItemsTypes[]) =>
      items.map((item) => ({ ...item, check: false }));

    if (pathname.toLowerCase() === "search" || searchQuery) {
      setBrandFilterData && setBrandFilterData(defaultItems);
      setBrandFilterData && setBrandFilterData(defaultItems);
      setSearchData && setSearchData(defaultItems);
    }
  }, [pathname, searchQuery]);

  // Cleanup checked filters state when navigating
  const queryParamsFromStorage: null | { [keys: string]: string[] } =
    localStorage.getItem("queryParams") !== null
      ? JSON.parse(localStorage.getItem("queryParams")!)
      : {};

  const queryParamsEntries = Object.entries(queryParamsFromStorage!);

  const prevQueryParamsEntriesRef = useRef(queryParamsEntries);

  const filterResetHandler = () => {
    if (!isEqual(prevQueryParamsEntriesRef.current, queryParamsEntries)) {
      if (queryParamsEntries.length > 0) {
        let totalQueryParamValues = queryParamsEntries.reduce(
          (currTotal, entry) => {
            return currTotal + entry[1].length;
          },
          0
        );
        if (totalQueryParamValues < 1) {
          if (
            !isEqual(currentFilterData!, initialFilterData!) ||
            !isEqual(searchData!, initialFilterData!)
          ) {
            setBrandFilterData && setBrandFilterData(initialFilterData!);
            setOtherFilterData && setOtherFilterData(initialFilterData!);
            setSearchData && setSearchData(initialFilterData!);
          }
        }
      } else {
        if (!isEqual(currentFilterData!, initialFilterData!)) {
          setBrandFilterData && setBrandFilterData(initialFilterData!);
          setOtherFilterData && setOtherFilterData(initialFilterData!);
        }
        if (!isEqual(searchData!, initialFilterData!)) {
          setSearchData && setSearchData(initialFilterData!);
        }
      }
      prevQueryParamsEntriesRef.current = queryParamsEntries;
    }
  };
  useEffect(() => {}, [
    queryParamsEntries,
    initialFilterData,
    currentFilterData,
    searchData,
  ]);

  // Helper function to check if two arrays are equal
  function isEqual(arr1: any[], arr2: any[]): boolean {
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }

  return {
    toggleSelection,
    updateQuery,
    filterResetHandler,
  };
};

export default useQueryParams;
