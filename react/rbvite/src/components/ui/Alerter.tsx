// import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from '@radix-ui/react-alert-dialog';
// import type { PropsWithChildren } from 'react';
// import { AlertDialogFooter, AlertDialogHeader } from './alert-dialog';

// type PropsWithChildren = {
//     title: string,
//     description?: string,
//     okText?: string,
//     cancelText?: string
// }

// export default function Alerter({ title, description, children }: PropsWithChildren) {
//     return (

//         <AlertDialog>
//             <AlertDialogTrigger>{children}</AlertDialogTrigger>
//             <AlertDialogContent>
//                 <AlertDialogHeader>
//                     <AlertDialogTitle>{title}</AlertDialogTitle>
//                     {!!description && <AlertDialogDescription>
//                         {description}
//                     </AlertDialogDescription>}
//                 </AlertDialogHeader>
//                 <AlertDialogFooter>
//                     <AlertDialogCancel>취소</AlertDialogCancel>
//                     <AlertDialogAction>확인</AlertDialogAction>
//                 </AlertDialogFooter>
//             </AlertDialogContent>
//         </AlertDialog>
//     )
// }