import { TagList } from "~/components/TagList";
import { createGetStaticProps } from "~/utils/createGetStaticProps";

export const getStaticProps = createGetStaticProps(["common"]);

const TagListPage = () => {
  return <TagList />;
};

export default TagListPage;
