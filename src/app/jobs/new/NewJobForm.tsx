"use client";

import LoadingButton from '@/components/LoadingButton';
import RichtextEditor from '@/components/RichTexteditor/RichtextEditor';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Select from "@/components/ui/select";
import { jobTypes, locationTypes } from '@/lib/jobtypes';
import { createJobSchema, createJobValues } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { draftToMarkdown } from 'markdown-draft-js';
import React from 'react'
import { useForm } from 'react-hook-form';

function NewJobForm() {

  const form = useForm<createJobValues>({
    resolver: zodResolver(createJobSchema)
  })

  const {
    handleSubmit,
    watch,
    trigger,
    control,
    setValue,
    setFocus,
    formState: {
      isSubmitting
    }
  } = form

  async function onSubmit(values: createJobValues) {
    console.log('====================================');
    console.log(values);
    console.log('====================================');
  }

  return (
    <main className='container flex flex-col justify-center items-center mt-20'>
      <div className="space-y-6 rounded-lg border p-4 md:min-w-[600px]">
        <div className="">
          <h2 className='text-xl text-black font-bold'>Job details</h2>
          <p className='text-sm text-gray-500'>Provide a job description and details</p>
        </div>

        <Form {...form}>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>

            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job title</FormLabel>
                  <FormControl>
                    <Input placeholder='e.g: Software Developer' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job type</FormLabel>
                  <FormControl>
                    <Select {...field} defaultValue="">
                      <option value="" hidden>
                        Select an option
                      </option>
                      {jobTypes.map((jobType) => (
                        <option key={jobType} value={jobType}>
                          {jobType}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="companyLogoUrl"
              render={({ field: { value, ...fieldValues } }) => (
                <FormItem>
                  <FormLabel>Company logo</FormLabel>
                  <FormControl>
                    <Input
                      {...fieldValues}
                      type='file'
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        fieldValues.onChange(file);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="locationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Select {...field} defaultValue="">
                      <option value="" hidden>
                        Select an option
                      </option>
                      {locationTypes.map((jobType) => (
                        <option key={jobType} value={jobType}>
                          {jobType}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>office location</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <Label htmlFor="applicationEmail">How to apply</Label>
              <div className="flex justify-between">
                <FormField
                  control={control}
                  name="applicationEmail"
                  render={({ field }) => (
                    <FormItem className='grow'>
                      <FormControl>
                        <div className="flex items-center">
                          <Input
                            id="applicationEmail"
                            placeholder="Email"
                            type='email'
                            {...field}
                          />
                          <span className='mx-2'>or</span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="applicationUrl"
                  render={({ field }) => (
                    <FormItem className='grow'>
                      <FormControl>
                        <Input
                          placeholder="website"
                          type='url'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel onClick={() => setFocus('description')}>Description</FormLabel>
                  <FormControl>
                    <RichtextEditor
                      onChange={draft => field.onChange(draftToMarkdown(draft))}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary</FormLabel>
                  <FormControl>
                    <Input {...field} type='number'/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <LoadingButton type='submit' loading={isSubmitting}>
              Submit
            </LoadingButton>
          </form>
        </Form>
      </div>
    </main>
  )
}

export default NewJobForm