import { useEffect } from 'react'
import {isZendeskPage} from './utils';
import {languageCodeEnglish} from "#utils/constants";
import { useHistory } from "#shared/hooks/useHistory";

const useZendesk = (isAuthorized: boolean) => {
    const history = useHistory();

    useEffect(() => {
        return () => {
            if (window.zE) {
                if (isZendeskPage(location.pathname, isAuthorized) && languageCodeEnglish) {
                    window.zE("webWidget", "show");
                } else {
                    window.zE("webWidget", "hide");
                }
            }
        }
  }, [history])

  return null;
}


export default useZendesk;