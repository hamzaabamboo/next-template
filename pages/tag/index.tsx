import { TagList } from "~/components/tag/TagList";
import { createGetStaticProps } from "~/utils/createGetStaticProps";

export const getStaticProps = createGetStaticProps(["common"]);

const TagListPage = () => {
  return <TagList />;
};

export default TagListPage;
