import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { useState } from "react"
import { Dropzone } from "./ui/shadcn-io/dropzone"

export default function DialogReceipt() {
  const [open, setOpen] = useState(false)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log("Form submitted")
    setOpen(false)
  }

  return (
    <div className="flex justify-center">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Novo recibo
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Adicione um novo recibo ou nota fiscal</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Dropzone
                accept={{
                  "image/*": [],
                }}
                maxSize={1024 * 1024 * 5}
                onDrop={(acceptedFiles) => {
                  console.log(acceptedFiles)
                }}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}