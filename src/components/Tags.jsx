import React from "react";
import { Button, Tag } from "@chakra-ui/react";

export default function Tags({tags, onTagClick}) {
  function handleClickTag(tag) {
    onTagClick(tag);
  }
  return(
    <section className="tagsArea">
      {tags && tags.length > 0 && tags.map((tag, index) => {
          return (
            <Tag
                  variant={tags.includes(tag) ? "solid" : "outline"}
                  colorScheme="teal"
                  size="lg"
                  key={index}
                  className="tag-label"
                  onClick={() => handleClickTag(tag)}
                >
                  {tag}
                </Tag>
            )
          })}
    </section>
    )
}