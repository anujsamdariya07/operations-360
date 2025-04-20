import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-10 rounded-md" />
        <div>
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-32 mt-2" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1">
          <CardHeader>
            <Skeleton className="h-5 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-full" />
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <Skeleton className="h-5 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-full" />
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <Skeleton className="h-5 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-full" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-48 mt-1" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-40" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full mt-2" />
              <Skeleton className="h-40 w-full mt-4" />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-40" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-40" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
