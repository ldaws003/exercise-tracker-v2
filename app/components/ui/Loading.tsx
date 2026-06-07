import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
  return (
      <Spinner className="w-full size-6 mx-auto" />
  )
}