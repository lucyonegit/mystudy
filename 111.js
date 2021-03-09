const data = {
  name: "all",
  children: [
    {
      name: "图片",
      children: [
        {
          name: "image1.jpg",
        },
        {
          name: "风景",
          children: [
            {
              name: "guilin.jpg",
            },
            {
              name: "hainan.jpg",
            },
          ],
        },
        {
          name: "image2.jpg",
        },
      ],
    },
    {
      name: "视频",
      children: [
        {
          name: "video1.mp4",
        },
        {
          name: "video2.mp4",
        },
      ],
    },
    {
      name: "文档",
      children: [
        {
          name: "document1.doc",
        },
        {
          name: "小说",
          children: [
            {
              name: "novel.txt",
            },
            {
              name: "novel2.txt",
            },
          ],
        },
        {
          name: "document2.doc",
        },
      ],
    },
  ],
};
const bfsFilter = (tree, ope, filter) => {
  const walkAndCopy = (tree, depth = 1) => {
    const queue = [];
    if (filter(tree.name)) {
      const copy = {};
      copy.name = tree.name;
      if (tree.children) {
        copy.children = [];
        queue.push({
          nodes: tree.children,
          depth: depth + 1,
          copyNodes: copy.children,
        });
      }
      while (queue.length) {
        const item = queue.shift();
        item.nodes &&
          item.nodes.forEach((node) => {
            if (filter(node.name)) {
              const copyNode = {};
              copyNode.name = node.name;
              if (node.children) {
                //console.log(node.children)
                copyNode.children = [];
                queue.push({
                  nodes: node.children,
                  depth: item.depth + 1,
                  copyNodes: copyNode.children,
                });
              }
              item.copyNodes.push(copyNode);
            }
          });
      }
      return copy;
    }
  };
  return walkAndCopy(tree);
};
const copyfilter = bfsFilter(
  data,
  (name, depth) => {},
  (name) => {
    return name.indexOf("1") === -1;
  }
);

console.log(copyfilter);
