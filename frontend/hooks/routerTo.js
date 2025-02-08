import { useState, useEffect, useMemo } from "react";
import Table from "@/comps/table";


export default function RouteTo(uri, setState) {
  let [index, setIndex] = useState(-1);

  const uris = useMemo(
    () => [
      {
        uri: "table",
        tangledIndex: 0,
        tangledComponent: <Table/>,
      }
    ],
    []
  );

  useEffect(() => {
    uris.forEach((_uri, idx) => {
      if (_uri.uri === uri) {
        setIndex(idx);
      }
    });
  }, [uri, uris]);

  useEffect(() => {
    if (index !== -1) {
      let tangledComponent = uris[index].tangledComponent;
      setState(tangledComponent);
    }
  }, [index, uris, setState]);

  return null;
}