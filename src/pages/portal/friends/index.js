'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuth } from '@/util/auth/context';
import { db } from '@/util/firebase';

export default function FriendsPage() {
  const [friends, setFriends] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [requests, setRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);
  const auth = useAuth();

  useEffect(() => {
    const { currentUser } = auth;
    setUser(currentUser);
  }, [auth]);

  const fetchUserData = async () => {
    const userRef = collection(db, 'userProfiles');
    const userQuery = query(userRef, where('userId', '==', user.uid));
    const userSnapshot = await getDocs(userQuery);

    if (!userSnapshot.empty) {
      const userData = userSnapshot.docs[0].data();
      setFriends(userData.friends);
      setRequests(userData.requests);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSearch = async (e) => {
    setSearchQuery(e.target.value);

    if (e.target.value.trim() !== '') {
      const usersRef = collection(db, 'users');
      const usersQuery = query(
        usersRef,
        where('nameLowercase', '>=', e.target.value.toLowerCase())
      );
      const usersSnapshot = await getDocs(usersQuery);

      const filteredResults = usersSnapshot.docs.map((doc) => doc.data());
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };

  const handleAddFriend = async (user) => {
    // In a real application, you would call an API here to send a friend request
    // For now, we'll just add the user to the requests list in Firestore

    const userRef = collection(db, 'userProfiles');
    const userQuery = query(userRef, where('userId', '==', user.uid));
    const userSnapshot = await getDocs(userQuery);

    if (!userSnapshot.empty) {
      const userData = userSnapshot.docs[0].data();
      const updatedRequests = [...userData.requests, user.id];

      await updateDoc(userSnapshot.docs[0].ref, {
        requests: updatedRequests,
      });

      setFriends([...friends, user]);
      setSearchResults(searchResults.filter((result) => result.id !== user.id));
    }
  };

  const handleAcceptRequest = async (user) => {
    // In a real application, you would call an API here to accept the friend request
    // For now, we'll just move the user from requests to friends in Firestore

    const userRef = collection(db, 'userProfiles');
    const userQuery = query(userRef, where('userId', '==', user.uid));
    const userSnapshot = await getDocs(userQuery);

    if (!userSnapshot.empty) {
      const userData = userSnapshot.docs[0].data();
      const updatedFriends = [...userData.friends, user.id];
      const updatedRequests = userData.requests.filter(
        (request) => request !== user.id
      );

      await updateDoc(userSnapshot.docs[0].ref, {
        friends: updatedFriends,
        requests: updatedRequests,
      });

      setFriends([...friends, user]);
      setRequests(requests.filter((request) => request.id !== user.id));
    }
  };

  return (
    <div className='container mx-auto p-4 text-gray-200'>
      <h1 className='text-2xl font-bold mb-4'>Friends</h1>

      <Tabs defaultValue='friends' className='mb-6'>
        <TabsList>
          <TabsTrigger value='friends'>Friends</TabsTrigger>
          <TabsTrigger value='requests'>Requests</TabsTrigger>
        </TabsList>

        <TabsContent value='friends'>
          <div className='mb-4'>
            <Input
              type='text'
              placeholder='Search for friends...'
              value={searchQuery}
              onChange={handleSearch}
              className='mb-2'
            />
            {searchResults.length > 0 && (
              <div className='bg-white shadow rounded-md p-4 mb-4 text-gray-800'>
                <h2 className='text-lg font-semibold mb-2'>Search Results</h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {searchResults.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Button onClick={() => handleAddFriend(user)}>
                            Add Friend
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>

          <h2 className='text-lg font-semibold mb-2'>Your Friends</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {friends.map((friend) => (
                <TableRow key={friend.id}>
                  <TableCell>{friend.name}</TableCell>
                  <TableCell>{friend.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value='requests'>
          <h2 className='text-lg font-semibold mb-2'>Friend Requests</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.name}</TableCell>
                  <TableCell>{request.email}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleAcceptRequest(request)}>
                      Accept
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
}
