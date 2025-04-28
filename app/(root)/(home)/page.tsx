const Home = async () => {
  return (
    <>
      <div className="h-full flex flex-col justify-between inset-y-0 ">
        <div className="">
          <div className="text-2xl text-black ">This is response:</div>
          <div className="@container px-auto border border-gray-300 p-4 rounded-lg flex justify-between">
            {/* <div className="text-lg">{response.choices[0].message.content}</div> */}
            <div></div>
            <div className="text-lg flex flex-col gap-2">
              <div>
                {/* Запрошено tokens: {completion?.usage?.prompt_tokens ? 0 : 83} */}
                Запрошено tokens: 83
              </div>
              <div>
                {/* Получено tokens: {completion?.usage?.completion_tokens ? 0 : 80} */}
                Получено tokens: 80
              </div>
              <div>
                {/* Всего tokens: {completion?.usage?.total_tokens ? 0 : 163} */}
                Всего tokens: 163
              </div>
            </div>
          </div>
        </div>

        {/* <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 "
          >
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    You can <span>@mention</span> other users and organizations.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-purple-600">
              SubmitUS
            </Button>
          </form>
        </Form> */}
      </div>
    </>
  );
};

export default Home;
