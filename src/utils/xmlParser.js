const getElementByXpath = (path, document) => {
  return document.evaluate(
    path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
};

const getElementsByXpath = (path, document) => {
  const result = [];
  const snapshot = document.evaluate(
    path,
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  );

  for (let i = 0; i < snapshot.snapshotLength; i++) {
    result.push(snapshot.snapshotItem(i));
  }

  return result;
};

const removeXmlTags = (string) => {
  return string.innerHTML
    .replace("<![CDATA[", "")
    .replace("]]>", "")
    .replace(/<\/?[^>]+(>|$)/g, "");
};

export { getElementByXpath, getElementsByXpath, removeXmlTags };
