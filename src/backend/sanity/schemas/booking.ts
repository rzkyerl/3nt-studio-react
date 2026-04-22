export default {
  name: 'booking',
  title: 'Booking Reservations',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    },
    {
      name: 'date',
      title: 'Preferred Date',
      type: 'date',
    },
    {
      name: 'package',
      title: 'Selected Package',
      type: 'string',
    },
    {
      name: 'notes',
      title: 'Notes',
      type: 'text',
    },
    {
      name: 'pdfUrl',
      title: 'Booking PDF URL',
      type: 'url',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Confirmed', value: 'confirmed' },
          { title: 'Completed', value: 'completed' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
      },
      initialValue: 'pending',
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: (new Date()).toISOString(),
    },
  ],
};
