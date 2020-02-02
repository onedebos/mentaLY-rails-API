# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])



Provider.create(
    name:'Mentally Aware',
    email:'contact@mentallyaware.org',
    state:'Lagos',
    logo:'https://baconmockup.com/640/360 ',
    description: 'We are focused on ending mental health stigma, and creating a comfortable environment for open conversations about mental health issues. As an organization, we have come to understand the importance of stories in challenging inbred notions about mental health issues, especially when the stories come from those with lived experience. This is what our campaigns revolve around and we can already see the change in attitude that has occurred as a result of this.'
)

Provider.create(
    name:'MyPaddi',
    email:'admin@mypadding.com',
    state:'Ondo',
    logo:'https://baconmockup.com/640/360 ',
    description: 'Online community of young people accessing sexual & reproductive health information & products anonymously'
)

Provider.create(
    name:'Mental Health Foundation',
    email:'owoyemi@mentalhealthnigeria.org',
    state:'Ekiti',
    logo:'https://baconmockup.com/640/360 ',
    description: 'Mental Health Foundation works assiduously to help all people prevent and overcome mental disorders, providing adequate information, education, encouragement, and support for people living with either mild or severe mental disorders alongside their family member.'
)

Provider.create(
    name:'Stand to End Rape(STER)',
    email:'STERAbuja@standtoendrape.org',
    state:'Abuja',
    logo:'https://baconmockup.com/640/360 ',
    description: 'We are a youth-led Not-for-Profit Organization advocating against sexual violence, providing prevention mechanisms and supporting survivors with psychosocial services. We advocate for rape survivors who can’t speak about their ordeal due to stigmatization, by enlighten our community on the need to end rape and victim blaming.'
)

Provider.create(
    name:'Aro Neuropsychiatric Hospital',
    email:'aro@aro.ng',
    state:'Ogun',
    logo:'https://baconmockup.com/640/360 ',
    description: 'A federal institution (hospital) where mentally ill patients are cared for without attaching any stigma and it is rich with historical legacy since inception.'
)

Provider.create(
    name:'PsychNG Services',
    email:'book@psychng.com',
    state:'Lagos',
    logo:'https://baconmockup.com/640/360 ',
    description: 'PsychNG Services provides psychological services for affective disorders; depression, anxiety and other related mood disorders. Our website also provide guided Audio lessons for stress relief and more! We understand that, sometimes talking about mental health can get a bit heavy - hence, the reason for the birth of PsychNG Community Forum. It is the place to be if you want to chill out and socialize with other members on similar topics. Our mini social network page encourages easy communication with friends and professionals. Share your stories. Share your journey. Help someone.'
)


Appointment.create(
    city: 'Lagos',
    user_id:2,
    provider_id:1,
    date: '20/02/2020',
    time:'22:50'
)

Appointment.create(
    city: 'Lagos',
    user_id:2,
    provider_id:1,
    date: '20/02/2020',
    time:'22:50'
)

Appointment.create(
    city: 'Lagos',
    user_id:2,
    provider_id:1,
    date: '20/02/2020',
    time:'22:50'
)

Appointment.create(
    city: 'Lagos',
    user_id:2,
    provider_id:1,
    date: '20/02/2020',
    time:'22:50'
)

User.create(
    id:2,
    first_name: 'a',
    last_name: 'b',
    email: 'a@b.com',
    password: 'password'
)