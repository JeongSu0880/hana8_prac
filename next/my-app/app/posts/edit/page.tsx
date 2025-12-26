// 다 페이지에 때려박아도 괜찮을까?

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import { Textarea } from '@/components/ui/textarea';
import { savePost } from './posts.action';

export default function PostsPage() {
  // const [] = useState()
  return (
    <div className="p-5">
      <h1>게시판 글 작성</h1>
      <form action={savePost} className="space-y-3">
        <div className="flex gap-2">
          <NativeSelect>
            <NativeSelectOption value="">공지사항</NativeSelectOption>
            <NativeSelectOption value="">자유게시판</NativeSelectOption>
            <NativeSelectOption value="">앨범</NativeSelectOption>
          </NativeSelect>
          <Input type="text" placeholder="title..." />
        </div>
        <div className="gap-2">
          <Textarea />
        </div>
        <div className="grid grid-cols-3 gap-20">
          <Button type="reset" variant="secondary">
            취소
          </Button>
          <Button type="button" variant="destructive">
            삭제
          </Button>
          <Button type="submit" variant="apply">
            저장
          </Button>
        </div>
      </form>
    </div>
  );
}
