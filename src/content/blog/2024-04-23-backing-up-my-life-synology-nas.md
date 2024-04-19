---
title: "Backing up my life with a Synology NAS"
teaser: "Data in a public cloud is out of your control, that's why I decided to create my own private cloud in my office."
author: Nicholas C. Zakas
categories:
  - Computers
tags:
  - Security
  - NAS
  - Synology
  - Backups
---
Sometime during 2023, I began getting extra paranoid about my data. I’ve never been great about backing up my computers, primarily because so much of what I did was stored in the cloud. My open source work is pushed to GitHub, my writing is in Google Docs and GitHub, important documents are in Google Drive, photos are in Google Photos, and so on. After all, companies like GitHub parent Microsoft and Google stake their reputations on keeping your data safe. My computer, in effect, is just an empty shell until I start pulling down data from these various cloud repositories.

Yet, every cloud service has its own data retention policy, and your data isn’t guaranteed to always be there when you need it. Google, for example, announced at the end of 2023 that it would start deleting inactive accounts.[^1] The bottom line: If the only copy of your data is in a cloud service, then it’s at risk. All I could think about is if I lost all of my photos or all of my business documents. And that’s when I started looking for a better backup strategy.

## The 3-2-1 backup strategy

The gold standard in backup strategies is the 3-2-1 strategy[^2], which prescribes:

* 3 copies of your data
* 2 different mediums
* 1 offsite copy

With this strategy in mind, I set off researching solutions.

## Enter the Synology DiskStation DS920+

When doing my research, I quickly came across Synology as a recommended NAS hardware provider. Synology offers a vast selection of NAS solutions ranging from personal to enterprise, so it took some time to determine which version to buy. I knew I wanted at least four hard drives for redundancy, which narrowed my search down to two options:

* DS423+
* DS923+

After seeking advice online, I determined that the DS923+ would be the better of the two choices for me primarily because it came preinstalled with 4 GB of RAM vs. the 2 GB of RAM that the DS423+ comes with. Most of the people I spoke with recommended at least 4 GB of RAM.

Then I went down the rabbit hole of DS923+ vs. DS920+. The DS920+ was the previous model and used a 4-core Intel Celeron with built-in transcoding whereas the DS923+ switched to an AMD Ryzen processor. The hardware encoding was a consideration for me because I wanted to use the NAS to run a Plex server. Some folks pointed out that not all Synology applications will run on the AMD Ryzen at this point. For both of these reasons, I opted for the DS920+. Unfortunately, Synology had stopped producing the DS920+ in favor of the DS923+, so I went to eBay to seek out my NAS.

For $680 USD, I found a refurbished DS920+ with four 4 TB hard drives included. I set up the drives in a Synology Hybrid RAID configuration to give me 8 TB of storage space and a tolerance of two failed drives. This option also allows me to hot-swap different size hard drives so I can upgrade the storage incrementally instead of buying four new hard drives at once.

With the NAS set up and ready to go, I started looking through the various applications to start backing up my data. 

## Synology Photos

The first thing I did was install Synology Photos[^3], first on my NAS, and then I installed the iOS app on my phone. Synology Photos is like a less advanced version of Google Photos and is designed to manage your entire photo library. The interface is similar to Google Photos, and it even includes (very basic) facial recognition. The iOS app can be set up to back up your phone’s photos in the background, ensuring that you’ll never lose a photo that you’ve taken. I previously was using the Google Photos iOS app for this, but now the photos are stored on my NAS (and not overly compressed, as Google Photos tends to do). 

There’s also a Synology Photos web application that you can use like Google Photos to do more extensive photo management.

Synology Photos is implemented on top of Synology Drive, which is the equivalent of Google Drive. You can use the Synology Drive client to synchronize photos from your computer to Synology Photos.

My only real complaint about Synology Photos is that the iOS app is very basic. It doesn’t have good offline capabilities and the functionality is limited. Still, to have complete control over my photo library feels great. I exported everything from Google Photos and then imported it all into Synology Photos for safekeeping.

## Synology Drive

While Synology has ActiveBackup for Business, an application that specifically can back up computers, virtual machines, servers, and other NAS devices, I chose to use Synology Drive[^4] to store my files. As I mentioned, I prefer to have my computer be easily replaceable, so I don’t want data on any computer that isn’t also present elsewhere. So instead of ActiveBackup for Business, I just use Synology Drive as the drive I store all my files to. That way, those files are always synchronized to my NAS, instantly creating two copies. This doesn’t interrupt my workflow and doesn’t require me to leave my computer on and connected to a network at any specific time.

## ActiveBackup for Google Workspace

Each of my businesses runs on Google Workspace. From email to calendaring to contacts to important documents to blog posts like this one, everything is managed in a Google Workspace specific to the business. If all of a sudden I didn’t have access to that information, it would be extremely difficult, if not impossible, to continue running each business. That’s why ActiveBackup for Google Workspace[^5] on a Synology NAS was a big driver of my purchase decision.

ActiveBackup for Google Workspace backs up absolutely everything in your account, and it can do so for multiple users. My family has a Google Workspace account that we all use as our primary email, and ActiveBackup for Google Workspace allowed me to back up each account individually. 

The best part is that ActiveBackup for Google Workspace synchronizes immediately through the use of Google’s APIs. I don’t have to wait until a certain time of day for the backup to run. Instead, the backup is updated within seconds of changes to any of our accounts. What’s more, you can access all of that backup information in the ActiveBackup for Google Workspace portal, meaning you don’t even need to have immediate access to your Google Workspace account to retrieve an email or file.

If you have a paid Google Workspace account, ActiveBackup for Google Workspace will give you the peace of mind that your business information is safe.

## Cloud Sync

In addition to Google Workspace, I had important data in both Box and Dropbox that I was afraid of losing. Fortunately, Synology had another application for that called Cloud Sync.[^6] As the name indicates, this application syncs your cloud storage services locally, ensuring that all of your files are also on the NAS. Similar to ActiveBackup for Google Workspace, Cloud Sync doesn’t need to wait for a particular time of day to sync (although it can if you want to). If you’re just making periodic changes to your cloud data, the syncing happens soon thereafter.

Keep in mind that Cloud Sync is not a backup solution per se. It just synchronizes files between the cloud service and the NAS. That means files deleted from the cloud service are also deleted locally. I’ll discuss how I manage that later in this post.

And with that, all of my cloud data is copied locally to my NAS.

## Snapshot Replication

Not all of the applications I’ve mentioned so far are backup solutions. A proper backup solution keeps records of changes to the data over time so you can restore a particular version. Cloud Sync, Synology Drive, and Synology Photos do no such backing up of data. Thankfully, Synology provides the Snapshot Replication[^7] application that is capable of creating snapshots for any shared folder on the NAS.

Snapshot Replication also allows you to create immutable snapshots, meaning the snapshots cannot be changed or deleted for the specified time period. Immutable snapshots are the ultimate protection against ransomware attacks, which often seek to delete or encrypt parts of your system. With immutable snapshots, that becomes impossible.

I set up Snapshot Replication to run every evening at midnight, so I’m guaranteed to never have more than 24 hours of stale data. The snapshots are kept locally on the NAS, although there is an option to replicate those snapshots remotely. I’ve chosen not to take that step because of the next application.

## Hyper Backup

Hyper Backup[^8] allows you to back up the NAS itself. You have complete control over what you back up, how frequently, and where the backup is stored. You can, for instance, schedule a backup to run on an attached USB drive or a cloud storage solution. You can run multiple tasks at different times depending on your own needs. 

I’ve scheduled the NAS backup to run after Snapshot Replication each night, storing the backup on the Backblaze B2[^9] service. B2 is an S3-compatible cloud storage solution that is much cheaper and provides automatic encryption of your data. Because I’m backing up the entire NAS, all of my local snapshots are also backed up and stored on B2, meaning all of my data and snapshots get backed up offsite each night. I’ve currently configured this task for 9 months of data retention before old backups are deleted to allow for new ones.

## Battery backup with a UPS

Shortly after I got everything set up on my NAS, we had a brief (10 seconds) power outage. I didn’t think too much about it but when I went to access something off my NAS it was, naturally, powered down. I started it back up again, and thankfully it came back online without any issues, but this worried me. What if I had been traveling and needed access to some files? Worse, what if the sudden loss of power damaged the system, making it unusable? I realized that to protect my investment my NAS needed to be plugged into an uninterruptible power supply (UPS).

After some research, I decided on the CyberPower CP1500PFCLCD.[^10] This UPS has 12 outlets, six of which are battery powered, and provides 1500VA with automatic voltage regulation (AVR) and true sine wave AC signal. Plus, it provides a heartbeat to the NAS via USB indicating the status of the UPS. This allows the NAS to both safely shut down when the battery is running low and to start back up again when power has been restored. 

I wasn’t sure what to expect for battery time, so I charged up the UPS and then unplugged it to let the NAS run. To my surprise, the NAS stayed running for 90 minutes before I ended my test. This test gave me confidence that I wouldn’t be cut off from my NAS while traveling. I also did a test with a low battery to ensure that the NAS would safely shut down (which it did) and then start up again when power was restored (which it also did).

The UPS turned out to be a good investment as there were several power outages during my holiday travels, but I was never cut off from the NAS.

## Conclusion

With that, my backup solution is complete. In general, I’ve achieved 3-2-1 through the use of the Synology DS920+ and all of its associated applications. This strategy ensures that all of my important data is backed up locally to the NAS and remotely to Backblaze B2 automatically. The overall cost was reasonable, coming in at under $1,000 USD, mostly because I bought a refurbished NAS. However, I’m so happy with the result that I would have had no problem paying double that for the extra peace of mind this setup gives me.

[^1]: [Google Deleting Gmail, Photos Content Soon: Here's How to Protect Your Data Before the Purge](https://www.techtimes.com/articles/299122/20231127/google-deleting-gmail-photos-content-soon-heres-protect-data-purge.htm)
[^2]: [What is a 3-2-1 Backup Strategy?](https://www.seagate.com/blog/what-is-a-3-2-1-backup-strategy/)
[^3]: [Synology Photos](https://www.synology.com/en-global/dsm/feature/photos)
[^4]: [Synology Drive](https://www.synology.com/en-global/dsm/feature/drive)
[^5]: [Active Backup Suite](https://www.synology.com/en-global/dsm/feature/active_backup_suite)
[^6]: [Cloud Sync](https://www.synology.com/en-global/dsm/feature/cloud_sync)
[^7]: [Snapshot Replication](https://www.synology.com/en-global/dsm/feature/snapshot_replication)
[^8]: [Hyper Backup](https://www.synology.com/en-global/dsm/feature/hyper_backup)
[^9]: [Backblaze B2](https://www.backblaze.com/cloud-storage)
[^10]: [CyberPower CP1500PFCLCD](https://geni.us/cp1500pfc) (affiliate link)
