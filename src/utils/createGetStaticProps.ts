import { GetStaticProps, GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { PageContext } from "types/PageContext";

export const createGetStaticProps = <T = PageContext>(
  namespaces: string[],
  getStaticProps?: GetStaticProps<T>
): GetStaticProps<T> => {
  return async (...args) => {
    const [{ locale }] = args;
    if (getStaticProps) {
      const props = getStaticProps?.(...args);
      return {
        ...props,
        props: {
          ...(await serverSideTranslations(locale ?? "en", namespaces)),
        } as any as T,
      };
    }
    return {
      props: {
        ...(await serverSideTranslations(locale ?? "en", namespaces)),
      } as any as T,
    };
  };
};
