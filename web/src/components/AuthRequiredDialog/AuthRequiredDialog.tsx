import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'src/components/ui/dialog'

import OAuthOrPassword from '../Auth/OAuthOrPassword/OAuthOrPassword'

interface IAuthRequiredDialogProps {
  triggerBtn: React.ReactNode
  onAuthenticated?: () => void
}

const AuthRequiredDialog = ({
  triggerBtn,
  onAuthenticated,
}: IAuthRequiredDialogProps) => {
  console.log('AuthRequiredDialog')
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerBtn}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log in or sign up to do this</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
          <OAuthOrPassword onAuthenticated={onAuthenticated} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default AuthRequiredDialog
